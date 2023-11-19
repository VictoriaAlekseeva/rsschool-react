import { createContext } from 'react';
import { BeerData } from '../types/interface';

const BeerDataContext = createContext<BeerData[] | null>(null);

export default BeerDataContext;
