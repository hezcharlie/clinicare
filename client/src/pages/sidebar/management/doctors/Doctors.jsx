import PageWrapper from '@/components/PageWrapper';
import ErrorAlert from "@/components/ErrorAlert";
import { SkeletonTable } from "@/components/LazyLoader";
import Paginate from "@/components/Paginate";
import Search from "@/components/Search";
import { useAuth } from "@/contextStore";
import usePaginate from "@/hooks/usePaginate";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { lazy, Suspense } from "react";
import DoctorFilter from '@/features/doctors/DoctorFilter';
import { getAllDoctors } from '@/api/doctors';
const DoctorTable = lazy(() => import("@/features/doctors/DoctorTable"));

export default function Doctors() {
 const { accessToken } = useAuth();
  const [SearchParams] = useSearchParams();
  const page = Number(SearchParams.get("page")) || 1;
  const limit = Number(SearchParams.get("limit")) || 10;
  const query = SearchParams.get("query") || "";
  const specialization = SearchParams.get("specialization") || "";
  const availability = SearchParams.get("availability") || "";
 const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllDoctors", page, limit, query,  specialization, availability],
    queryFn: () => getAllDoctors(SearchParams, accessToken),
  }); 

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: data?.data?.data?.meta?.totalPages || 1,
    hasMore: data?.data?.data?.meta?.hasMore || false,
    currentPage: data?.data?.data?.meta?.currentPage || 1,
  });

  const doctors = data?.data?.data?.doctors || [];



  return (
    <PageWrapper>
        <div className="pb-5">
          <h1 className="font-bold text-2xl">Doctors</h1>
          <p className="text-gray-500">Manage your doctors</p>
        </div>
          <div className="flex justify-end items-center md:justify-end gap-2 pb-5">
                <Search id="search-users">
                  <DoctorFilter />
                </Search>
              </div>

                {isPending ? (
                      <SkeletonTable />
                    ) : (
                      <>
                        {isError ? (
                          <ErrorAlert error={error?.response?.data?.message} />
                        ) : (
                          <>
                            {doctors?.length > 0 ? (
                              <>
                                <Suspense fallback={<SkeletonTable />}>
                                  <DoctorTable doctors={doctors} />
                                </Suspense>
                                <Paginate
                                  totalPages={totalPages}
                                  hasMore={hasMore}
                                  handlePageChange={handlePageChange}
                                  currentPage={currentPage}
                                />
                              </>
                            ) : (
                              <p className="mt-6 font-semibold text-center">
                                No doctors found
                              </p>
                            )}
                          </>
                        )}
                      </>
                    )}
              
    </PageWrapper>
  )
}
