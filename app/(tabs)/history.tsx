import React, { useMemo, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { mockTransactions, mockUser } from '@/utils/mockData';
import { TransactionCard, FilterBar, ReceiptPreviewModal } from '@/components/history';
import { Colors } from '@/constants/Colors';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { Transaction } from '@/types';

type FilterType = 'credit' | 'debit' | null;

export default function HistoryScreen() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<FilterType>(null);
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [receiptVisible, setReceiptVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((item) => {
      const matchesType =
        !filterType ||
        (filterType === 'credit' && item.type === 'receive') ||
        (filterType === 'debit' && item.type === 'send');
      const matchesDate =
        !filterDate ||
        item.date.toLocaleDateString() === filterDate.toLocaleDateString();
      return matchesType && matchesDate;
    });
  }, [filterType, filterDate]);

  const clearFilters = () => {
    setFilterType(null);
    setFilterDate(null);
    setShowDatePicker(false);
  };

  const openReceipt = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setReceiptVisible(true);
  };

  const closeReceipt = () => {
    setReceiptVisible(false);
    setSelectedTransaction(null);
  };

  const handleReceiptDownload = () => {
    if (!selectedTransaction) return;
    console.log('Descargar comprobante:', selectedTransaction.id);
    // TODO: Implementar descarga real de PDF
  };

  const renderListHeader = () => (
    <View style={styles.listHeader}>
      <FilterBar
        filterType={filterType}
        filterDate={filterDate}
        showDatePicker={showDatePicker}
        onFilterTypeChange={setFilterType}
        onFilterDateChange={setFilterDate}
        onShowDatePicker={setShowDatePicker}
        onClearFilters={clearFilters}
      />
    </View>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionCard
            transaction={item}
            isExpanded={expanded === item.id}
            onToggle={() => toggleExpand(item.id)}
            onDownload={() => openReceipt(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay movimientos con ese filtro.</Text>
            <Text style={styles.emptySubtext}>
              Intenta ajustar los filtros o limpia la búsqueda.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
      <ReceiptPreviewModal
        visible={receiptVisible}
        transaction={selectedTransaction}
        user={mockUser}
        onClose={closeReceipt}
        onDownload={handleReceiptDownload}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  listHeader: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  emptyContainer: {
    marginTop: Spacing['2xl'],
    backgroundColor: Colors.complementary.white,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing['2xl'],
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    shadowColor: Colors.ui.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.text.secondary,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    marginBottom: Spacing.xs,
  },
  emptySubtext: {
    textAlign: 'center',
    color: Colors.text.light,
    fontSize: Typography.sizes.sm,
  },
});
