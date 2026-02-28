import { API_BASE_URL } from './config';

const getPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      if (response.status === 404) throw new Error('Посты не найдены (404)');
      if (response.status >= 500) throw new Error('Сервер временно недоступен'); // если define('DB_PASS', 'root1');
      throw new Error(
        `HTTP ${response.status} — Ошибк{API_BAа при загрузке постов`
      );
    }
    return await response.json();
  } catch (err) {
    if (err.name === 'TypeError') {
      throw new Error('Сеть недоступна или сервер не отвечает');
    }
    throw err;
  }
};

const getPostById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}?id=${id}`);
    if (!response.ok) {
      if (response.status === 404) throw new Error('Пост не найден (404)');
      if (response.status >= 500) throw new Error('Сервер временно недоступен');
      throw new Error(`HTTP ${response.status} — Ошибка при загрузке поста`);//кидает общую ошибку
    }                                                         
    return await response.json();
  } catch (err) {
    if (err.name === 'TypeError') {
      throw new Error('Сеть недоступна или сервер не отвечает');
    }
    throw err;
  }
};

const updatePost = async (id, postData) => {
  try {
    const fd = new FormData();
    fd.append('_method', 'PUT');
    if (postData.title != null) fd.append('title', postData.title);
    if (postData.content != null) fd.append('content', postData.content);
    if (postData.cover) fd.append('cover', postData.cover); // только если выбран новый файл

    const response = await fetch(`${API_BASE_URL}?id=${id}`, {
      method: 'POST',
      body: fd,
    });

    if (!response.ok) {
      if (response.status === 404) throw new Error('Пост не найден (404)');
      if (response.status >= 500) throw new Error('Сервер временно недоступен');
      throw new Error(`HTTP ${response.status} — Ошибка при обновлении поста`);
    }

    const data = await response.json();
    if (data.status !== 'success') {
      throw new Error(data.message || 'Сохранение не удалось');
    }
    return data; // { status: 'success', id, cover: string | null }
  } catch (err) {
    if (err.name === 'TypeError')
      throw new Error('Сеть недоступна или сервер не отвечает');
    throw err;
  }
};

const deletePost = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      if (response.status === 404) throw new Error('Пост не найден (404)');
      if (response.status >= 500) throw new Error('Сервер временно недоступен');
      throw new Error(`HTTP ${response.status} — Ошибка при удалении поста`);
    }

    const data = await response.json();
    if (data.status !== 'success') {
      throw new Error(data.message || 'Удаление не удалось');
    }
    return data;
  } catch (err) {
    if (err.name === 'TypeError') {
      throw new Error('Сеть недоступна или сервер не отвечает');
    }
    throw err;
  }
};

export { getPosts, getPostById, deletePost, updatePost };
