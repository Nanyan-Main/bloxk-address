"use client";
import useAddress from "@/hooks/useAddress";
import { getCsvFileName } from "@/utils/get-csv-file-name.util";
import { parse } from "json2csv";

export default function Download() {
  const { downloadAddresses } = useAddress();
  const handleSubmit = async () => {
    const { data } = await downloadAddresses();
    if (data?.length === 0) return alert("No data to download");
    if (data !== null && data !== undefined && data.length > 0) {
      const csv = parse(data);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("download", getCsvFileName());
      a.click();
    }
  };
  return (
    <div className="mt-8 ">
      <button
        onClick={() => handleSubmit()}
        className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
      >
        Download
      </button>
    </div>
  );
}
