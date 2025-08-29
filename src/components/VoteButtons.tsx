import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";

// LocalStorage key
const KEY = "projectVotes";

type VotesStore = Record<string, 1 | -1 | 0>;

function readStore(): VotesStore {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {} as VotesStore;
  }
}

function writeStore(store: VotesStore) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {}
}

interface VoteButtonsProps {
  id: string; // unique item id
  onChange?: (value: 1 | -1 | 0) => void;
}

export function VoteButtons({ id, onChange }: VoteButtonsProps) {
  const [vote, setVote] = useState<1 | -1 | 0>(0);

  useEffect(() => {
    const store = readStore();
    if (store[id] !== undefined) setVote(store[id]);
  }, [id]);

  const setAndPersist = (value: 1 | -1 | 0) => {
    setVote(value);
    const store = readStore();
    store[id] = value;
    writeStore(store);
    onChange?.(value);
  };

  const toggleUp = () => setAndPersist(vote === 1 ? 0 : 1);
  const toggleDown = () => setAndPersist(vote === -1 ? 0 : -1);

  return (
    <div className="inline-flex items-center gap-1">
      <Button variant={vote === 1 ? "default" : "outline"} size="sm" onClick={toggleUp}>
        <ThumbsUp className="h-4 w-4" />
      </Button>
      <span className="text-sm w-6 text-center select-none">
        {vote === 1 ? "+1" : vote === -1 ? "-1" : "0"}
      </span>
      <Button variant={vote === -1 ? "destructive" : "outline"} size="sm" onClick={toggleDown}>
        <ThumbsDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
