import { useEffect, useState } from "react";
import ImageColors from "react-native-image-colors";
import { colors } from "../styles/Colors";

export default function useImageColors(url?: string) {
  const [primaryColor, setPrimaryColor] = useState(colors.background.overlay);

  useEffect(() => {
    async function getColors() {
      if (!url) {
        return;
      }

      const imageColors = await ImageColors.getColors(url, {
        fallback: colors.background.overlay
      });

      switch (imageColors.platform) {
        case "android":
          setPrimaryColor(imageColors.dominant);
          break;
        case "ios":
          setPrimaryColor(imageColors.primary);
          break;
        default:
          break;
      }
    }

    getColors();
  }, [url]);

  return { primaryColor };
}
