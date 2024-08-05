import React from 'react';
import { saveAs } from 'file-saver';
import { useActions } from '../../hooks/actions';
import { RootState } from '../../store';
import { UseAppSelector } from '../../hooks/redux';
import styles from './flyout.module.css';

const Flyout: React.FC = () => {
  const { unselectAll } = useActions();
  const selectedCards = UseAppSelector(
    (state: RootState) => state.selectedCard.selected
  );

  const handleUnselectAll = () => {
    unselectAll();
  };

  const handleDownload = () => {
    const csvContent = selectedCards
      .map(
        (card) =>
          `${card.id},${card.name},${card.status},${card.species},${card.url},${card.origin.name},${card.origin.url},${card.location.name}`
      )
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedCards.length}_cards.csv`);
  };

  if (selectedCards.length === 0) {
    return null;
  }

  return (
    <div className={styles.flyout}>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <p>{selectedCards.length} items are selected</p>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
