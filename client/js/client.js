window.onload = () => {
  const form = document.querySelector('#chat-form');
  const messages = document.querySelector('#chat-list');
  const input =  document.querySelector('#chat-input');
  const status =  document.querySelector('#chat-status');

  const ws = new WebSocket('ws://localhost:3000');

  const setStatus = (text) => {
    status.innerHTML = text;
  }

  const printMessage = (text) => {
    const li = document.createElement('li');

    li.innerHTML = text;
    messages.appendChild(li);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value !== '') {
      ws.send(input.value)
      input.value = '';
    }
  })

  ws.onopen = () => {
    setStatus('online');
  };

  ws.onclose = () => {
    setStatus('disconnected');
  };

  ws.onmessage = (response) => {
    printMessage(response.data);
  }
}