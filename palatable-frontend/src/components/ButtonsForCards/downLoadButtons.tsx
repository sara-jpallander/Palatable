import { downloadPalette } from "../../utils/downloadPalette"

export default function DownloadButtons() {
    return (
        <>
        //för att man ska kunna zippa mappen behöver man skriva in mappens namn, samt vilka namn på filerna som finns i den. 
          <button onClick={() => downloadPalette("fire", ["variables.css", "typography.css"])}>
                    Ladda ner Fire
                  </button>
                  <button onClick={() => downloadPalette("forrest", ["test1.css", "test2.css"])}>
                    Ladda ner Forrest
                  </button>
        </>
    )
}