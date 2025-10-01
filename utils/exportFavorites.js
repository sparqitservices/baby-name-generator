// utils/exportFavorites.js

export function exportToCSV(favorites) {
  if (!favorites || favorites.length === 0) {
    alert('No favorites to export');
    return;
  }

  const headers = ['Name', 'Gender', 'Meaning', 'Origin', 'Pronunciation', 'Hindi', 'Urdu', 'Arabic'];
  
  const rows = favorites.map(f => [
    f.name || '',
    f.gender || '',
    f.meaning || '',
    f.origin || '',
    f.pronunciation || '',
    f.translation?.hindi || '',
    f.translation?.urdu || '',
    f.translation?.arabic || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `favorite-baby-names-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToJSON(favorites) {
  if (!favorites || favorites.length === 0) {
    alert('No favorites to export');
    return;
  }

  const jsonContent = JSON.stringify(favorites, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `favorite-baby-names-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function printFavorites(favorites) {
  if (!favorites || favorites.length === 0) {
    alert('No favorites to print');
    return;
  }

  const printWindow = window.open('', '_blank');
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>My Favorite Baby Names</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
        }
        h1 {
          color: #333;
          border-bottom: 3px solid #4F46E5;
          padding-bottom: 10px;
        }
        .name-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          page-break-inside: avoid;
        }
        .name-title {
          font-size: 24px;
          font-weight: bold;
          color: #4F46E5;
          margin-bottom: 10px;
        }
        .gender-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .boy { background: #DBEAFE; color: #1E40AF; }
        .girl { background: #FCE7F3; color: #BE185D; }
        .meaning {
          color: #555;
          line-height: 1.6;
          margin: 10px 0;
        }
        .translations {
          background: #F9FAFB;
          padding: 15px;
          border-radius: 6px;
          margin-top: 10px;
        }
        .translation-item {
          margin: 8px 0;
        }
        .translation-label {
          font-weight: bold;
          color: #666;
          font-size: 12px;
        }
        .translation-text {
          font-size: 18px;
          color: #333;
        }
        @media print {
          body { margin: 0; }
          .name-card { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <h1>My Favorite Baby Names</h1>
      <p style="color: #666; margin-bottom: 30px;">Generated on ${new Date().toLocaleDateString()}</p>
      ${favorites.map(name => `
        <div class="name-card">
          <div class="name-title">${name.name}</div>
          <span class="gender-badge ${name.gender}">${name.gender === 'boy' ? '👦 Boy' : '👧 Girl'}</span>
          ${name.origin ? `<p style="color: #888; font-style: italic; font-size: 14px;">Origin: ${name.origin}</p>` : ''}
          ${name.pronunciation && name.pronunciation !== name.name ? `<p style="color: #888; font-size: 14px;">Pronunciation: ${name.pronunciation}</p>` : ''}
          <div class="meaning">${name.meaning}</div>
          ${name.translation && Object.keys(name.translation).length > 0 ? `
            <div class="translations">
              ${name.translation.hindi ? `
                <div class="translation-item">
                  <div class="translation-label">Hindi:</div>
                  <div class="translation-text">${name.translation.hindi}</div>
                </div>
              ` : ''}
              ${name.translation.urdu ? `
                <div class="translation-item">
                  <div class="translation-label">Urdu:</div>
                  <div class="translation-text" dir="rtl">${name.translation.urdu}</div>
                </div>
              ` : ''}
              ${name.translation.arabic ? `
                <div class="translation-item">
                  <div class="translation-label">Arabic:</div>
                  <div class="translation-text" dir="rtl">${name.translation.arabic}</div>
                </div>
              ` : ''}
            </div>
          ` : ''}
        </div>
      `).join('')}
    </body>
    </html>
  `;
  
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 250);
}