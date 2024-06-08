import { ref } from "vue";

export function useDebounce<T>(value: T, delay = 300) {
  const debounceValue = ref<T | string>(value);

  let timeout: ReturnType<typeof setTimeout>;

  const updateDebounceValue = (value: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      debounceValue.value = value;
    }, delay);
  };

  return { debounceValue, updateDebounceValue };
}
