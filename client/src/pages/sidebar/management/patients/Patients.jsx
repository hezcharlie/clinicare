import { getAllPatients } from "@/api/patients";
import ErrorAlert from "@/components/ErrorAlert";
import { SkeletonTable } from "@/components/LazyLoader";
import PageWrapper from "@/components/PageWrapper";
import Paginate from "@/components/Paginate";
import Search from "@/components/Search";
import { useAuth } from "@/contextStore";
import PatientsFilter from "@/features/patients/PatientsFilter";
import usePaginate from "@/hooks/usePaginate";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { lazy, Suspense } from "react";
const Table = lazy(() => import("@/features/patients/Table"));

export default function Patients() {
  const { accessToken } = useAuth();
  const [SearchParams] = useSearchParams();
  const page = Number(SearchParams.get("page")) || 1;
  const limit = Number(SearchParams.get("limit")) || 10;
  const query = SearchParams.get("query") || "";
  const gender = SearchParams.get("gender") || "";
  const bloodGroup = SearchParams.get("bloodGroup") || "";
 const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllPatients", page, limit, query, gender, bloodGroup],
    queryFn: () => getAllPatients(SearchParams, accessToken),
  }); 

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: data?.data?.data?.meta?.totalPages || 1,
    hasMore: data?.data?.data?.meta?.hasMore || false,
    currentPage: data?.data?.data?.meta?.currentPage || 1,
  });

  const patients = data?.data?.data?.patients || [];

  return (
    <>
      <PageWrapper>
        <div className="pb-5">
          <h1 className="font-bold text-2xl">Patients</h1>
          <p className="text-gray-500">Manage your patients</p>
        </div>
        <div className="flex justify-end items-center md:justify-end gap-2 pb-">
          <Search id="search-users">
            <PatientsFilter />
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
                {patients?.length > 0 ? (
                  <>
                    <Suspense fallback={<SkeletonTable />}>
                      <Table patients={patients} />
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
                    No patients found
                  </p>
                )}
              </>
            )}
          </>
        )}
      </PageWrapper>
    </>
  );
}
