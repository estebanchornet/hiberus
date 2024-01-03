export function getDataUrl(blob: Blob): Promise<string | null> {
  return new Promise((resolve, _) => {
    const temporaryFileReader = new FileReader();
    temporaryFileReader.onloadend = () => {
      resolve(temporaryFileReader.result as string | null);
    };
    temporaryFileReader.readAsDataURL(blob);
  });
}
