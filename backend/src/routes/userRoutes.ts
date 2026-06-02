/* ///////////// IMPORTS ///////////////// */
import express from "express";
import type { Request, Response } from "express";
import userValidation from "../validation/user.schema.ts"
import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import createJWT from "../validation/createJWT.ts";
import User from "../models/User.ts";

const router = express.Router()


/* ///////////// ROUTES ///////////////// */
router.post("/register", createUser); /* Kryptering och validering */
router.post("/login", userLogin); /* Avkryptering och auth middleware */
router.get("/:id", getUserById); /* Behöver passera auth för att komma till denna sida? */
router.get("/", getUsers);
router.put("/:id", updateUserById); /* Ny kryptering om nytt lösen, validering */
router.delete("/:id", deleteUserById);


/* ////////////// MISC. ////////////////// */

/* Funktion för att göra första bokstaven stor i en sträng 
  - för att 'name' ska sparas i ett visst format i db*/
const capitalize = <T extends string>(s: T) => {
  if (s.length === 0) return s;
  return (s[0]!.toUpperCase() + s.slice(1).toLowerCase()) as Capitalize<T>;
};



// CREATE USER
async function createUser(req: Request, res: Response) {
    try {
      // Formattera namn och email
      req.body.name = capitalize(req.body.name); 
      req.body.email = req.body.email.toLowerCase(); // För att inte ha dubletter av emails genom case insensitivity

      // Validera inputen
      const parsed = userValidation.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({ error: "Validering misslyckades. ", details: parsed.error });
      };

      // Kryptera lösenord
      req.body.password = await bcrypt.hash(req.body.password, 10);

      // Skapa användare
      const user = await User.create(req.body);

      // Skickar tillbaka rätt status kod samt skapar en token direkt när man registrerar så att man kan bli inloggad direkt efter skapat konto.
      const token = createJWT(user); 
      res.status(201).json({ 
        message: "Användaren skapad", 
        token: token, 
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email
        } 
      });
    } catch (error) {
    	res.status(500).json({ message: `Internal server error. Misslyckades att skapa användare. ${error}` });
    };
};


// GET USER - LOGIN
async function userLogin(req: Request, res: Response) {
  try {

    // Hitta att user finns via email
    const user = await User.findOne({
      email: req.body.email.toLowerCase()
    }).lean();

    if (!user) {
      return res.status(404).json({ error: "Användaren finns inte" })
    }

    // Kontrollera lösenordet
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
      return res.status(400).json({ message: "Fel lösenord" });
    }; // returnerar statuskoden som meddelande istället för "incorrect password"

    // Skapa token
    const token = createJWT(user);

    res.status(200).json({ message: "Login har lyckats!", token: token, user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email
    } });
  } catch (error) {
    res.status(500).json({ message: `Internal server error. Misslyckad inloggning. ${error}` });
  }
};


// GET USER BY ID VIA AUTH TOKEN
interface ProtectedRequest extends Request {
  user?: JwtPayload;
}

async function getUserById(req: ProtectedRequest, res: Response) {
  try {
    // Hämta token från request headern
    const bearerToken = req.headers.authorization?.split(" ")[1];

    // Felhantering
    if (!bearerToken || bearerToken === undefined) {
      return res.status(404).json({ message: "Token kunde inte hittas." })
    }

    if (!process.env.JWT_SECRET) {
      return res.status(404).json({ message: "JWT_SECRET kunde inte hittas." })
    }

    // Avkoda token - få fram requested user id genom decoded.id
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET as string) as JwtPayload;

    // Ta fram user
    if (req.params.id && decoded.id as String === req.params.id as String) {
      const user = await User.findById(req.params.id);

      return res.status(200).json({ message: "User: ", data: user })
      // Märker att den här requesten tar lång tid...
    } else {
      return res.status(409).json({error: "Token matchar inte efterfrågade användaren."})
    }
    
  } catch (error) {
      res.status(500).json({ message: `Internal server error. Misslyckades att hämta användereb - authentisering misslyckades. ${error}` });
  }
};


// GET ALL USERS
async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({ message: "Den efterfrågade responsen misslyckades." });
    }

    res.status(200).json({ message: "Här är alla användare:", data: users });
    
  } catch (error) {
    res.status(500).json({ message: `Internal server error. Misslyckades att hämta alla användare. ${error}` });
  }
}

// UPDATE USER
async function updateUserById(req: Request, res: Response) {
  try {
    // Om nytt namn anges, formattera
    if (req.body.name) {
      req.body.name = capitalize(req.body.name); 
    }

    // Om ny email anges, formattera
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase();
    }

    // Validera inputen men bara det som anges i body
    const parsed = userValidation.partial().safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: "Validering misslyckades.", details: parsed.error });
    };

    // Kryptera nytt lösenord
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Uppdatera användare
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!user) {
      return res.status(404).json({ error: "Efterfrågade användaren finns inte"});
    }

    res.status(201).json({ message: "Användaren uppdaterad", data: user });
  } catch (error) {
      res.status(500).json({ message: `Internal server error. Misslyckades att uppdatera användaren. ${error}` });
  }
};


// DELETE USER
async function deleteUserById(req: Request, res: Response) {
  try {
    
    // Ta bort användare
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Efterfrågade användaren finns inte"});
    }
    
    res.status(200).json({ message: "Lyckades att ta bort användaren", data: user })
  } catch (error) {
    res.status(500).json({ message: `Internal server error. Misslyckades att ta bort användaren. ${error}` });
  };
};

export default router;