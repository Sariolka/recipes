import { BASE_URL, HOST, KEY, KEY_NAME, URL_NAME } from '../../config.ts';
import type { CardType } from '@/components/types/types.ts';
// import { useAuthStore } from '@/components/Stores/auth.ts'
// const store  = useAuthStore()

export const fetchRecipes = (
  query: string,
  count: number,
  time?: string,
  meal?: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status >= 200 && this.status < 300) {
          try {
            const res = JSON.parse(this.responseText);
            resolve(res);
          } catch (error: any) {
            reject(new Error('Тело ответа не является успешным: ' + error.message));
          }
        } else {
          reject(new Error(`Ошибка: ${this.status} ${this.statusText}`));
        }
      }
    });
    const baseUrl = `${BASE_URL}recipes/list?from=${count}&size=36&q=${query}`;
    const params = [];
    if (time || meal) {
      const tags = [time, meal].filter(Boolean).join(',');
      params.push(`tags=${tags}`);
    }
    const url = params.length > 0 ? `${baseUrl}&${params.join('&')}` : baseUrl;
    xhr.open('GET', url);
    xhr.setRequestHeader(KEY_NAME, KEY);
    xhr.setRequestHeader(URL_NAME, HOST);
    xhr.send();
  });
};

export const BASE_PATH = 'http://localhost:3000';

export const processResponse = async <T>(response: Response): T => {
  if (!response.ok) {
    throw new Error(
      'Произошла ошибка при попытке получить данные с сервера. Статус ответа не является успешным'
    );
  }

  const data = await response.json();
  console.log(data);
  return data as T;
};

export const get = async <T>(path: string): Promise<T> => {
  const response = await fetch(BASE_PATH + path, {
    method: 'GET',
    headers: makeHeaders()
  });

  return processResponse<T>(response);
};

const makeHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
};

export const post = async <T>(path: string, body: unknown): Promise<T> => {
  const response = await fetch(BASE_PATH + path, {
    method: 'POST',
    headers: makeHeaders(),
    body: JSON.stringify(body)
  });
  return processResponse<T>(response);
};

export const del = async <T>(path: string): Promise<T> => {
  const response = await fetch(BASE_PATH + path, {
    method: 'DELETE',
    headers: makeHeaders()
  });

  return processResponse<T>(response);
};
export const put = async <T>(path: string, body: unknown): Promise<T> => {
  const response = await fetch(BASE_PATH + path, {
    method: 'PUT',
    headers: makeHeaders(),
    body: JSON.stringify(body)
  });

  return processResponse<T>(response);
};

export const deleteRecipe = async (id: string) => {
  return del<void>(`/favourites/${id}`);
};

export const loadSavedRecipes = async () => {
  return await get<[]>(`/favourites`);
};

export const saveRecipe = async (recipe: CardType) => {
  return post<CardType>('/favourites', recipe);
};

export const changeSave = async (id: string) => {
  return put<void>(`/favourites/${id}`, { isSaved: false });
};

export const register = async (user: object) => {
  return post<any>(`/register`, user);
};

export const signin = async (user: object) => {
  return post<any>(`/login`, user);
};
