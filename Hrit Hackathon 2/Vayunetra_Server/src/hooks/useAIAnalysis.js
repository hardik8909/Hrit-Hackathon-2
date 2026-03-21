import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { wards, forecastData } from "@/data/mock-data";
import { useToast } from "@/hooks/use-toast";

export function useAIAnalysis(type) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const analyze = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error: fnError } = await supabase.functions.invoke("ai-analysis", {
        body: { type, wardData: wards, forecastData },
      });

      if (fnError) throw new Error(fnError.message);
      if (!result?.success) throw new Error(result?.error || "Analysis failed");

      setData(result.data);
    } catch (e) {
      const msg = e?.message || "AI analysis failed";
      setError(msg);
      toast({
        title: "AI Analysis Error",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [type, toast]);

  return { data, loading, error, analyze };
}
