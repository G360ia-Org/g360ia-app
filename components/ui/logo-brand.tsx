import { View, Text, StyleSheet } from 'react-native';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  subtitle?: string;
};

const SIZES = {
  sm: { block: 7, gap: 2, title: 13, sub: 9 },
  md: { block: 11, gap: 3, title: 18, sub: 11 },
  lg: { block: 16, gap: 4, title: 26, sub: 13 },
};

export default function LogoBrand({ size = 'md', showText = true, subtitle = 'Panel Admin' }: Props) {
  const s = SIZES[size];

  return (
    <View style={styles.wrapper}>
      {/* Icon grid — recreación del SVG del admin */}
      <View style={[styles.icon, { gap: s.gap }]}>
        {/* Columna 1: 3 bloques */}
        <View style={{ gap: s.gap }}>
          <View style={[styles.block, { width: s.block, height: s.block, backgroundColor: 'rgba(255,255,255,1)' }]} />
          <View style={[styles.block, { width: s.block, height: s.block, backgroundColor: 'rgba(255,255,255,0.6)' }]} />
          <View style={[styles.block, { width: s.block, height: s.block, backgroundColor: 'rgba(255,255,255,0.35)' }]} />
        </View>
        {/* Columna 2: 2 bloques */}
        <View style={{ gap: s.gap }}>
          <View style={[styles.block, { width: s.block, height: s.block, backgroundColor: 'rgba(255,255,255,1)' }]} />
          <View style={[styles.block, { width: s.block, height: s.block, backgroundColor: 'rgba(255,255,255,0.6)' }]} />
        </View>
        {/* Columna 3: 1 bloque dorado */}
        <View style={{ gap: s.gap }}>
          <View style={[styles.block, { width: s.block, height: s.block, backgroundColor: '#B08A55' }]} />
        </View>
      </View>

      {/* Texto */}
      {showText && (
        <View>
          <Text style={[styles.title, { fontSize: s.title }]}>
            Gestión 360 <Text style={styles.accent}>iA</Text>
          </Text>
          <Text style={[styles.sub, { fontSize: s.sub }]}>{subtitle}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 9,
    padding: 8,
  },
  block: {
    borderRadius: 2,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  accent: {
    color: '#B08A55',
  },
  sub: {
    color: 'rgba(255,255,255,0.45)',
    fontWeight: '500',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: 2,
  },
});
