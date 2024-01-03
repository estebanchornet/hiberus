import ContentLoader, { Rect } from "react-content-loader/native";
import { View } from "react-native";
import { colors } from "../styles/Colors";
import { cornerRadius, spacings } from "../styles/Constants";

export function PokemonListItemSkeletonComponent({ width }: { width: number }) {
  return (
    <View style={{ marginBottom: spacings.lg }}>
      <ContentLoader
        backgroundColor={colors.skeleton.background}
        foregroundColor={colors.skeleton.foreground}
        width={width * 0.5 - spacings.lg}
        height={120}>
        <Rect
          x="0"
          y="0"
          rx={cornerRadius.md}
          ry={cornerRadius.md}
          width={width * 0.5 - spacings.lg}
          height="120"
        />
      </ContentLoader>
    </View>
  );
}
