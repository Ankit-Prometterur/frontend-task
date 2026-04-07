let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let editId = null;

document.getElementById('date').valueAsDate = new Date();

function saveTransaction() {
  const description = document.getElementById('description').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  const date = document.getElementById('date').value;

  if (!description || isNaN(amount) || amount <= 0 || !date) {
    alert('Please fill all fields correctly.');
    return;
  }

  if (editId) {
    transactions = transactions.map(item =>
      item.id === editId ? { ...item, description, amount, type, date } : item
    );

    editId = null;
  } else {
    transactions.push({
      id: Date.now(),
      description,
      amount,
      type,
      date
    });
  }

  localStorage.setItem('transactions', JSON.stringify(transactions));
  clearForm();
  renderTransactions();
  updateSummary();
}

function renderTransactions() {
  const list = document.getElementById('transactionList');
  const fromDate = document.getElementById('fromDate').value;
  const toDate = document.getElementById('toDate').value;
  const filterType = document.getElementById('filterType').value;

  let filteredTransactions = [...transactions];

  if (fromDate) {
    filteredTransactions = filteredTransactions.filter(item => item.date >= fromDate);
  }

  if (toDate) {
    filteredTransactions = filteredTransactions.filter(item => item.date <= toDate);
  }

  if (filterType !== 'all') {
    filteredTransactions = filteredTransactions.filter(item => item.type === filterType);
  }

  list.innerHTML = '';

  if (filteredTransactions.length === 0) {
    list.innerHTML = '<p style="color:#94a3b8;text-align:center;padding:20px;">No transactions found</p>';
    return;
  }

  filteredTransactions.forEach(item => {
    list.innerHTML += `
      <div class="transaction ${item.type}-item">
        <div>
          <h4>${item.description}</h4>
          <p>${item.date}</p>
          <div class="actions">
            <button class="icon-btn edit-btn" onclick="editTransaction(${item.id})">
  <i class="fa-solid fa-pen"></i> Edit
</button>

<button class="icon-btn delete-btn" onclick="deleteTransaction(${item.id})">
  <i class="fa-solid fa-trash"></i> Delete
</button>
          </div>
        </div>
        <div>
          ${item.type === 'income' ? '+' : '-'}₹${item.amount}
        </div>
      </div>
    `;
  });
}

function deleteTransaction(id) {
  transactions = transactions.filter(item => item.id !== id);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  renderTransactions();
  updateSummary();
}

function editTransaction(id) {
  const item = transactions.find(t => t.id === id);
  editId = id;

  document.getElementById('editDescription').value = item.description;
  document.getElementById('editAmount').value = item.amount;
  document.getElementById('editType').value = item.type;
  document.getElementById('editDate').value = item.date;
  document.getElementById('editModal').classList.add('show');

}

function closeEditModal() {
  document.getElementById('editModal').classList.remove('show');
}

function updateTransaction() {
  const description = document.getElementById('editDescription').value.trim();
  const amount = parseFloat(document.getElementById('editAmount').value);
  const type = document.getElementById('editType').value;
  const date = document.getElementById('editDate').value;

  if (!description || isNaN(amount) || amount <= 0 || !date) {
    alert('Please fill all fields correctly.');
    return;
  }

  transactions = transactions.map(item =>
    item.id === editId ?
      { ...item, description, amount, type, date }

      : item
  );

  localStorage.setItem('transactions', JSON.stringify(transactions));

  renderTransactions();
  updateSummary();
  closeEditModal();
}

function updateSummary() {
  const income = transactions
    .filter(item => item.type === 'income')
    .reduce((total, item) => total + item.amount, 0);

  const expense = transactions
    .filter(item => item.type === 'expense')
    .reduce((total, item) => total + item.amount, 0);

  const balance = income - expense;

  document.getElementById('income').textContent = `₹${income}`;
  document.getElementById('expense').textContent = `₹${expense}`;
  document.getElementById('balance').textContent = `₹${balance}`;
}

function clearForm() {
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('type').value = 'income';
  document.getElementById('date').valueAsDate = new Date();
}

function exportTransactions() {
  let csv = 'Description,Amount,Type,Date\n';

  transactions.forEach(item => {
    csv += `${item.description},${item.amount},${item.type},${item.date}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'expense-report.csv';
  a.click();
}

renderTransactions();
updateSummary();