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
}

export const Autocomplete = ({ onSubmit, placeholder }: IAutocomplete) => {
  const [value, setValue] = useState({ text: "", active: false });
  const [queries, setQueries] = useState<TQuery[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const text = queries?.[0]?.domain || value.text;
    onSubmit({ value: text, query: undefined, queries });
    setValue({ text, active: false });
    setQueries([]);
  };

  const handleClick = (query: TQuery) => {
    onSubmit({ value: value.text, query, queries });
    setValue({ text: query.domain, active: false });
  };

  const reset = () => {
    setQueries([]);
    setValue({ text: "", active: false });
  };

  const getQueries = useCallback(async (searchValue: string) => {
    if (searchValue !== "") {
      try {
        const url = `https://api.brandfetch.io/v2/search/${searchValue}`;

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
    <div className={styles.container}>
      {/* <div className={styles.brandInfo}>
        Provided by{" "}
        <a href="https://brandfetch.com/" rel="noreferrer" target="_blank">
          Brandfetch
        </a>
      </div> */}

      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
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
          />
          {value.text !== "" && (
            <div className={styles.iconSuffix} onClick={reset}>
              <FaTimes />
            </div>
          )}
        </form>
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
                  {/* <div className={styles.queryDomain}>{query.domain}</div> */}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.notFound}>
              <IoIosSearch className={styles.notFoundIcon} />
              <p className={styles.bold}>Nothing found...</p>
              <p>Search by entering its website URL for better results.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
