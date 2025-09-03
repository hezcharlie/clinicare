import PageWrapper from "@/components/PageWrapper";
import AddRooms from "@/features/rooms/AddRooms";
import { getAllRooms } from "@/api/rooms";
import ErrorAlert from "@/components/ErrorAlert";
import { SkeletonTable } from "@/components/LazyLoader";
import Paginate from "@/components/Paginate";
import Search from "@/components/Search";
import { useAuth } from "@/contextStore";
import usePaginate from "@/hooks/usePaginate";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { lazy, Suspense } from "react";
import RoomFilter from "@/features/rooms/RoomFilter";
const RoomTable = lazy(() => import("@/features/rooms/RoomTable"));

export default function Rooms() {
 const { accessToken } = useAuth();
  const [SearchParams] = useSearchParams();
  const page = Number(SearchParams.get("page")) || 1;
  const limit = Number(SearchParams.get("limit")) || 10;
  const query = SearchParams.get("query") || "";
  const roomType = SearchParams.get("roomType") || "";
  const roomStatus = SearchParams.get("roomStatus") || "";
 const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllRooms", page, limit, query,  roomType, roomStatus],
    queryFn: () => getAllRooms(SearchParams, accessToken),
  }); 

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: data?.data?.data?.meta?.totalPages || 1,
    hasMore: data?.data?.data?.meta?.hasMore || false,
    currentPage: data?.data?.data?.meta?.currentPage || 1,
  });

  const rooms = data?.data?.data?.rooms || [];


  return (
    <PageWrapper>
      <div className="md:flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">Rooms</h1>
          <p className="text-gray-500">Manage your rooms</p>
        </div>
        <AddRooms />
      </div>
      <div className="flex justify-end items-center md:justify-end gap-2 pb-5">
        <Search id="search-users">
          <RoomFilter />
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
              {rooms?.length > 0 ? (
                <>
                  <Suspense fallback={<SkeletonTable />}>
                    <RoomTable rooms={rooms} />
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
  );
}
