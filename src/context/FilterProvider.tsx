'use client'
 
import { createContext, useState, useMemo, SetStateAction, Dispatch } from 'react'
 
const initialState = 0;

type FilterContextType = [number, Dispatch<SetStateAction<number>>];

export const FilterContext = createContext<FilterContextType>([initialState, () => {}]);
 
export default function FilterProvider({
  children,
}: {
  readonly children: React.ReactNode
}) {
    const [activeFilter, setActiveFilter] = useState(0);

    const contextValue = useMemo(() => {
        return [ activeFilter, setActiveFilter ] as FilterContextType
    },[activeFilter, setActiveFilter])

    return <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>
}