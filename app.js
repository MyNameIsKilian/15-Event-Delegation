const addItems = document.querySelector('.add-items')
const itemsList = document.querySelector('.plates')
const items = JSON.parse(localStorage.getItem('items')) || []

const addItem = (e) => {
  e.preventDefault();
  const text = (addItems.querySelector('[name=item]')).value
  const item = {
    text,
    done: false
  }
  items.push(item)
  populateList(items, itemsList)
  localStorage.setItem('items', JSON.stringify(items));
  e.currentTarget.reset();
}

const populateList = (plates = [], plateList) => {
  plateList.innerHTML = plates.map((item, i) => {
    return `
      <li>
        <input type="checkbox" data-index="${i}" id="item${i}" ${item.done ? 'checked' : ''} />
        <label for="item${i}">${item.text}</label>
      </li>`;
  }).join('');
}

const toggleDone = (e) => {
  if(!e.target.matches('input')) return;
  const index = e.target.dataset.index
  items[index].done = !items[index].done
  localStorage.setItem('items', JSON.stringify(items));
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList)