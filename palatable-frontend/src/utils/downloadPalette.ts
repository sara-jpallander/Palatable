import JSZip from 'jszip';

export async function downloadPalette(paletteId: string, files: string[]) {
  const zip = new JSZip();
  const folder = zip.folder(paletteId)!;
// skapar en ny tom zip och en mapp inuti den med palett namnet. 
  await Promise.all(
    files.map(async (file) => {
      const text = await fetch(`/palettes/${paletteId}/${file}`).then(r => r.text());
      folder.file(file, text);
    })
  );

  // Hämtar varje css fil som tillhör paletten och lägger till den i zip mappen.  
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  
  //Genererar den faktiska zip-filen som en Blob och skapar en tillfällig URL till den.
  //en blob är en fil-liknande objekt som innehåller data. URL.createObjectURL skapar en tillfällig URL som pekar på den genererade zip-filen.
  const a = document.createElement("a");
  a.href = url;
  a.download = `${paletteId}-palette.zip`;
  a.click();
  URL.revokeObjectURL(url);
}