import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchResultsClient from "@/components/SearchResultsClient";

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="p-6 text-gray-600">Loading search results...</div>}>
        <SearchResultsClient />
      </Suspense>
      <Footer />
    </>
  );
}
