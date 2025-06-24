import { useEffect } from "react";
import { supabase } from "../supabase/Client";

export default function useRealtimeLikes(
  tableName: string,
  onLikeUpdate: (id: string, likes: number) => void
) {
  useEffect(() => {
    const channel = supabase
      .channel(`realtime:${tableName}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: tableName,
        },
        (payload) => {
          const updated = payload.new;
          onLikeUpdate(updated.id, updated.likes);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName, onLikeUpdate]);
}
