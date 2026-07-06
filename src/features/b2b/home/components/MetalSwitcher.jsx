import React, { useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../../../theme/useAppTheme';
import { DiamondGlyph, IngotsGlyph } from './JewelryGlyphs';
import { createStyles } from './MetalSwitcher.styles';

const glyphFor = (code) => (code === 'DIAMOND' ? DiamondGlyph : IngotsGlyph);

const MetalSwitcher = ({ metals, selectedMetalId, onSelect }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {metals.map((metal) => {
        const active = metal.id === selectedMetalId;
        const Glyph = glyphFor(metal.code);
        return (
          <TouchableOpacity
            key={metal.id}
            activeOpacity={0.9}
            style={[styles.card, active && styles.cardActive]}
            onPress={() => onSelect(metal)}
          >
            <Glyph color={active ? theme.onPrimary : theme.primary} size={22} />
            <Text style={[styles.label, active && styles.labelActive]}>
              {metal.name?.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default MetalSwitcher;
