export function exportToCSV(favorites) {
  if (!favorites || favorites.length === 0) {
    alert('No favorites to export!');
    return;
  }

  const headers = ['Name', 'Meaning', 'Origin', 'Gender'];
  const csvContent = [
    headers.join(','),
    ...favorites.map(fav => 
      [fav.name, `"${fav.meaning}"`, fav.origin, fav.gender].join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `favorite-baby-names-${Date.now()}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJSON(favorites) {
  if (!favorites || favorites.length === 0) {
    alert('No favorites to export!');
    return;
  }

  const jsonContent = JSON.stringify(favorites, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `favorite-baby-names-${Date.now()}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printFavorites(favorites) {
  if (!favorites || favorites.length === 0) {
    alert('No favorites to print!');
    return;
  }

  const printWindow = window.open('', '_blank');
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Favorite Baby Names</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            max-width: 1200px;
            margin: 0 auto;
          }
          h1 {
            color: #4f46e5;
            border-bottom: 3px solid #4f46e5;
            padding-bottom: 10px;
          }
          .name-card {
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            break-inside: avoid;
          }
          .name {
            font-size: 24px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 10px;
          }
          .meaning {
            color: #6b7280;
            margin-bottom: 8px;
          }
          .details {
            display: flex;
            gap: 20px;
            font-size: 14px;
            color: #9ca3af;
          }
          @media print {
            body { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <h1>My Favorite Baby Names (${favorites.length})</h1>
        ${favorites.map(fav => `
          <div class="name-card">
            <div class="name">${fav.name}</div>
            <div class="meaning">${fav.meaning}</div>
            <div class="details">
              <span>Origin: ${fav.origin}</span>
              <span>Gender: ${fav.gender}</span>
            </div>
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