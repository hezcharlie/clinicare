import PageWrapper from "@/components/PageWrapper";
import ErrorAlert from "@/components/ErrorAlert";
import { SkeletonTable } from "@/components/LazyLoader";
import Paginate from "@/components/Paginate";
import Search from "@/components/Search";
import { useAuth } from "@/contextStore";
import usePaginate from "@/hooks/usePaginate";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { lazy, Suspense } from "react";
import BookAppointment from "@/features/appointments/patients/BookAppointment";
import { getPatientsAppointment } from "@/api/appointments";
import Filter from "@/features/appointments/patients/Filter";
const PatientAppTable = lazy(() => import("@/features/appointments/patients/PatientAppTable"));

export default function PatientsAppointment() {
 const { accessToken } = useAuth();
  const [SearchParams] = useSearchParams();
  const page = Number(SearchParams.get("page")) || 1;
  const limit = Number(SearchParams.get("limit")) || 10;
  const query = SearchParams.get("query") || "";
  const startDate = SearchParams.get("startDate") || "";
  const endDate = SearchParams.get("endDate") || "";
 const { isPending, isError, data, error } = useQuery({
    queryKey: ["getPatientsAppointment", page, limit, query,  startDate, endDate],
    queryFn: () => getPatientsAppointment(SearchParams, accessToken),
  }); 

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: data?.data?.data?.meta?.totalPages || 1,
    hasMore: data?.data?.data?.meta?.hasMore || false,
    currentPage: data?.data?.data?.meta?.currentPage || 1,
  });

  const patientsAppointment = data?.data?.data?.appointments || [];

  return (
     <PageWrapper>
          <div className="md:flex justify-between items-center space-y-3">
            <div>
              <h1 className="font-bold text-2xl">Appointments</h1>
              <p className="text-gray-500">Manage your appointments</p>
            </div>
            <BookAppointment />
          </div>
          <div className="flex justify-end items-center md:justify-end gap-2 pb-5 pt-5">
            <Search id="search-users">
              <Filter />
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
                  {patientsAppointment?.length > 0 ? (
                    <>
                      <Suspense fallback={<SkeletonTable />}>
                        <PatientAppTable patientsAppointment={patientsAppointment} />
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
                      No rooms found
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </PageWrapper>
    
  )
}
