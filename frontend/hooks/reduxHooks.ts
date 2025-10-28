import { AppDispatch, RootState } from "@/store/config";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// ✅ Typed hooks to use across the app
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
