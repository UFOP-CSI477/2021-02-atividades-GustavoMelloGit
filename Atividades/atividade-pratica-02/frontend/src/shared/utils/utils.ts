import toast from 'react-hot-toast';
import api from '../../services/api';
import { Equipment } from '../types/Equipment';
import { Registers } from '../types/Registers';

export function parseJwt(token: string) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export function dateFormatter(date: string) {
  return new Date(date).toLocaleDateString();
}

export const getEquipmentsData = async () => {
  try {
    const response = await api.get('/equipments');
    const {
      data,
    }: {
      data: Equipment[];
    } = response;
    const sortedDataAlphabetically = data.sort((a: Equipment, b: Equipment) =>
      a.name.localeCompare(b.name)
    );
    return sortedDataAlphabetically;
  } catch (e) {
    toast.error('Erro ao buscar equipamentos');
  }
};

export const getRegistersData = async () => {
  try {
    const response = await api.get('/maintenance');
    const {
      data,
    }: {
      data: Registers[];
    } = response;
    return data;
  } catch (e) {
    toast.error('Erro ao buscar registros');
  }
};
