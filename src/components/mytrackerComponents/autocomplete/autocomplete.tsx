import {
  ChangeEvent,
  useCallback,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { IoIosSearch } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import styles from "./autocomplete.module.css";

type TQuery = {
  name: string;
  domain: string;
  icon: string;
};

export type TAutocomplete = {
  value: string;
  query?: TQuery;
  queries: TQuery[];
};

interface IAutocomplete {
  onSubmit: ({ value, queries, query }: TAutocomplete) => void;
  placeholder: string;
  initialValue?: TQuery;
}

const apiKey = process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY;

export const Autocomplete = ({ onSubmit, placeholder, initialValue }: IAutocomplete) => {
  const [value, setValue] = useState({ text: initialValue?.name || "", active: false });
  const [queries, setQueries] = useState<TQuery[]>([]);
  const [icon, setIcon] = useState({ text: initialValue?.icon || "", active: !!initialValue?.icon });


  const handleSearch = () => {
    const text = queries?.[0]?.domain || value.text;
    onSubmit({ value: text, query: undefined, queries });
    setValue({ text, active: false });
    setQueries([]);
  };

  const handleClick = (query: TQuery) => {
    onSubmit({ value: value.text, query, queries });
    setValue({ text: query.name, active: false });
    setIcon({ text: query.icon, active: true });
  };

  const reset = () => {
    setQueries([]);
    setValue({ text: "", active: false });
    setIcon({ text: "", active: false });
  };

  const getQueries = useCallback(async (searchValue: string) => {
    if (searchValue !== "") {
      try {
        const url = `https://api.brandfetch.io/v2/search/${searchValue}?c=${apiKey}`;

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setQueries(data);
        }
      } catch (err) {
        console.log("Something went wrong, try again later.");
      }
      return;
    }

    setQueries([]);
  }, []);

  useEffect(() => {
    getQueries(value.text);
  }, [getQueries, value.text]);

  return (
    <div className={styles.container} style={{ position: "relative" }}>
      <div className={styles.formWrapper}>
        <div className={styles.form}>
          <div className={styles.iconPrefix}>
            <IoIosSearch />
          </div>
          <input
            className={styles.input}
            placeholder={placeholder}
            value={value.text}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue({ text: e.target.value, active: true })
            }
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          {icon.active && (
            <img src={icon.text} alt="Selected company icon" className={styles.selectedIcon}/>
          )}
          {value.text !== "" && (
            <div className={styles.iconSuffix} onClick={reset}>
              <FaTimes />
            </div>
          )}
        </div>
      </div>

      

      {value.active && value.text !== "" && (
        <div className={styles.queryWrapper}>
          {queries.length ? (
            <div className={styles.queryList}>
              {queries.map((query, i) => (
                <div
                  key={i}
                  className={styles.queryItem}
                  onClick={() => handleClick(query)}
                >
                  <div className={styles.queryImage}>
                    <img src={query.icon} alt={query.name} />
                  </div>
                  <div className={styles.queryName}>{query.name || query.domain}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.notFound}>
              <IoIosSearch className={styles.notFoundIcon} />
              <span className={styles.bold}>Nothing found...</span>
              {/* <p>Search by entering its website URL for better results.</p> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

