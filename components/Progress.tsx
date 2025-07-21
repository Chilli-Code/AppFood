import { Bike, CheckCircle2, ClipboardList, Soup } from 'lucide-react-native';
import { MotiView } from 'moti';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');
const TOTAL_STEPS = 4;
const ICON_SIZE = 30;
const LINE_WIDTH = (width - ICON_SIZE * TOTAL_STEPS - 40) / (TOTAL_STEPS - 1);

const statusSteps = {
  taken: 0,
  packed: 1,
  on_the_way: 2,
  delivered: 3,
};

type Props = {
  status: keyof typeof statusSteps;
};

const StepProgressBar = ({ status }: Props) => {
  const step = statusSteps[status] ?? 0;
  const icons = [ClipboardList, Soup, Bike, CheckCircle2];

  const getColor = (i: number) => (i <= step ? '#FE8C00' : '#ccc');

  return (
    <View style={styles.container}>
      {icons.map((Icon, index) => (
        <View key={index} style={styles.iconWithLine}>
          <Icon size={ICON_SIZE} color={getColor(index)} />
          {index < icons.length - 1 && (
            <MotiView
              from={{ width: 0 }}
              animate={{ width: step > index ? LINE_WIDTH : 0 }}
              transition={{ duration: 800 }}
              style={[styles.line, { backgroundColor: getColor(index + 1) }]}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWithLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 2,
    marginHorizontal: 4,
  },
});

export default StepProgressBar;
