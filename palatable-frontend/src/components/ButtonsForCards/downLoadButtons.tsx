import { downloadPalette } from "../../utils/downloadPalette"

interface Props{
  palette: string, 
  files: string[]
}

export default function DownloadButtons({ palette, files }: Props) {
    return (
              //för att man ska kunna zippa mappen behöver man skriva in mappens namn, samt vilka namn på filerna som finns i den. 

        <>
          <button onClick={() => downloadPalette(palette, files)}>
            Download 
          </button>
        </>
    )
}