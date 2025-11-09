import React from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';

type FilterType = 'credit' | 'debit' | null;

interface FilterBarProps {
  filterType: FilterType;
  filterDate: Date | null;
  showDatePicker: boolean;
  onFilterTypeChange: (type: FilterType) => void;
  onFilterDateChange: (date: Date | null) => void;
  onShowDatePicker: (show: boolean) => void;
  onClearFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filterType,
  filterDate,
  showDatePicker,
  onFilterTypeChange,
  onFilterDateChange,
  onShowDatePicker,
  onClearFilters,
}) => {
  const hasActiveFilters = Boolean(filterType || filterDate);
  const dateLabel = filterDate
    ? filterDate.toLocaleDateString('es-CR', { day: '2-digit', month: 'short' })
    : 'Fecha';

  const handleDateChange = (event: any, selectedDate?: Date) => {
    onShowDatePicker(false);
    if (selectedDate) {
      onFilterDateChange(selectedDate);
    }
  };

  const toggleFilterType = (type: FilterType) => {
    onFilterTypeChange(filterType === type ? null : type);
  };

  const handleDatePress = () => {
    onShowDatePicker(true);
  };

  const handleRemoveDate = () => {
    onFilterDateChange(null);
  };

  return (
    <View style={styles.container}>
      {showDatePicker && (
        <DateTimePicker
          value={filterDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={handleDateChange}
        />
      )}

      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Filtrar movimientos</Text>
          <Text style={styles.subtitle}>Selecciona tipo o fecha</Text>
        </View>
        {hasActiveFilters && (
          <Pressable style={styles.clearChip} onPress={onClearFilters}>
            <Icon name="refresh" size={16} color={Colors.primary.red} />
            <Text style={styles.clearText}>Limpiar</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.chipsRow}>
        <Pressable
          style={[styles.chip, styles.typeChip, filterType === 'credit' && styles.activeChip]}
          onPress={() => toggleFilterType('credit')}
        >
          <Text style={[styles.chipText, filterType === 'credit' && styles.activeChipText]}>
            Créditos
          </Text>
        </Pressable>

        <Pressable
          style={[styles.chip, styles.typeChip, filterType === 'debit' && styles.activeChip]}
          onPress={() => toggleFilterType('debit')}
        >
          <Text style={[styles.chipText, filterType === 'debit' && styles.activeChipText]}>
            Débitos
          </Text>
        </Pressable>

        <Pressable
          style={[styles.chip, filterDate && styles.activeChip]}
          onPress={handleDatePress}
        >
          <Icon
            name="calendar-today"
            size={16}
            color={filterDate ? Colors.primary.red : Colors.complementary.white}
          />
          <Text style={[styles.chipText, filterDate && styles.activeChipText, styles.dateChipText]}>
            {dateLabel}
          </Text>
        </Pressable>
      </View>

      {filterDate && (
        <Pressable style={styles.dateReset} onPress={handleRemoveDate}>
          <Icon name="event-busy" size={16} color={Colors.primary.red} />
          <Text style={styles.dateResetText}>Quitar filtro de fecha</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
  },
  subtitle: {
    marginTop: 2,
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
  },
  clearChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    gap: Spacing.xs,
  },
  clearText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Colors.primary.red,
    textTransform: 'uppercase',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.md,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary.red,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
    minHeight: 44,
    backgroundColor: Colors.primary.red,
  },
  typeChip: {
    paddingHorizontal: Spacing.md,
  },
  chipText: {
    color: Colors.complementary.white,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
  },
  dateChipText: {
    marginLeft: Spacing.xs,
  },
  activeChip: {
    backgroundColor: Colors.complementary.white,
  },
  activeChipText: {
    color: Colors.primary.red,
  },
  dateReset: {
    marginTop: Spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  dateResetText: {
    fontSize: Typography.sizes.xs,
    color: Colors.primary.red,
    fontWeight: Typography.weights.medium,
  },
});

