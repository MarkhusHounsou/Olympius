import { useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, StyleSheet, Text, View } from 'react-native';
import { formatMetricDisplay, formatMetricValue } from '../mocks/data';
import { layout } from '../theme/layout';
import { useTheme } from '../theme/ThemeContext';

function getScale(challenge) {
  if (challenge.metricType === 'distance') return 10;
  return 1;
}

function getStep(challenge) {
  if (challenge.metricType === 'time') return 5;
  if (challenge.metricType === 'calories') return 10;
  return 1;
}

export function SliderValidation({ challenge, value, onChange }) {
  const { theme } = useTheme();
  const scale = getScale(challenge);
  const step = getStep(challenge);
  const max = challenge.target * scale;
  const trackWidth = useRef(0);
  const onChangeRef = useRef(onChange);
  const maxRef = useRef(max);
  const stepRef = useRef(step);
  const valueRef = useRef(value);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    onChangeRef.current = onChange;
    maxRef.current = max;
    stepRef.current = step;
    valueRef.current = value;
  }, [onChange, max, step, value]);

  const displayValue = challenge.metricType === 'distance' ? value / scale : value;
  const ratio = max > 0 ? value / max : 0;

  const valueFromX = (x) => {
    if (!trackWidth.current) return valueRef.current;
    const raw = Math.round((x / trackWidth.current) * maxRef.current);
    const stepped = Math.round(raw / stepRef.current) * stepRef.current;
    return Math.max(0, Math.min(maxRef.current, stepped));
  };

  const panResponder = useMemo(
    () => PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        setDragging(true);
        onChangeRef.current(valueFromX(evt.nativeEvent.locationX));
      },
      onPanResponderMove: (evt) => {
        onChangeRef.current(valueFromX(evt.nativeEvent.locationX));
      },
      onPanResponderRelease: () => setDragging(false),
      onPanResponderTerminate: () => setDragging(false),
    }),
    [],
  );

  const question = challenge.metricType === 'reps'
    ? `Combien de ${challenge.unit} ?`
    : challenge.metricType === 'distance'
      ? 'Quelle distance ?'
      : challenge.metricType === 'calories'
        ? 'Combien de calories ?'
        : 'Combien de temps ?';

  return (
    <View style={styles.wrap}>
      <Text style={[styles.question, { color: theme.textMuted }]}>{question}</Text>
      <Text style={[styles.value, { color: theme.text }]}>{formatMetricDisplay(displayValue, challenge)}</Text>
      <Text style={[styles.ratio, { color: theme.textMuted }]}>{formatMetricValue(displayValue, challenge)}</Text>

      <View
        onLayout={(e) => { trackWidth.current = e.nativeEvent.layout.width; }}
        style={styles.sliderArea}
        {...panResponder.panHandlers}
      >
        <View style={[styles.track, { backgroundColor: theme.track }]}>
          <View style={[styles.fill, { width: `${ratio * 100}%`, backgroundColor: theme.accentPrimary }]} />
        </View>
        <View
          pointerEvents="none"
          style={[
            styles.thumb,
            {
              left: `${ratio * 100}%`,
              backgroundColor: theme.accentPrimary,
              borderColor: theme.background,
              transform: [{ scale: dragging ? 1.12 : 1 }],
            },
          ]}
        />
      </View>

      <View style={styles.rangeLabels}>
        <Text style={[styles.range, { color: theme.textMuted }]}>0</Text>
        <Text style={[styles.range, { color: theme.textMuted }]}>{challenge.target}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: layout.sectionGap },
  question: { fontSize: 14, fontWeight: '500', textAlign: 'center' },
  value: { fontFamily: 'Anton_400Regular', fontSize: 44, textAlign: 'center', marginTop: 20 },
  ratio: { fontSize: 14, fontWeight: '500', textAlign: 'center', marginTop: 6 },
  sliderArea: {
    marginTop: 40,
    height: 52,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: { height: '100%' },
  thumb: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    marginLeft: -14,
    top: 12,
    borderWidth: 3,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  range: { fontSize: 13, fontWeight: '500' },
});
