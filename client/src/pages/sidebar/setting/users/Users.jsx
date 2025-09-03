import PageWrapper from "@/components/PageWrapper";
import AddNewUser from "@/features/usersCard/AddNewUser";
// import UsersCard from ;
import Paginate from "@/components/Paginate";
import { RiFilterLine, RiSearchLine } from "@remixicon/react";
import { getAllUsers } from "@/api/auth";
import ErrorAlert from "@/components/ErrorAlert";
import { SkeletonCard } from "@/components/LazyLoader";
import { useAuth } from "@/contextStore";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import usePaginate from "@/hooks/usePaginate";
import Search from "@/components/Search";
import Filter from "@/features/usersCard/Filter";
import { lazy, Suspense } from "react";
const UsersCard = lazy(() => import("@/features/usersCard/UsersCard"));

export default function Users() {
  const { accessToken } = useAuth();
  const [SearchParams] = useSearchParams();
  const page = Number(SearchParams.get("page")) || 1;
  const limit = Number(SearchParams.get("limit")) || 10;
  const query = SearchParams.get("query") || "";
  const role = SearchParams.get("role") || "";
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllUsers", page, limit, query, role],
    queryFn: () => getAllUsers(SearchParams, accessToken),
  });

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: data?.data?.data?.meta?.totalPages || 1,
    hasMore: data?.data?.data?.meta?.hasMore || false,
    currentPage: data?.data?.data?.meta?.currentPage || 1,
  });

  const users = data?.data?.data?.users || [];

  if (isPending) {
    return <SkeletonCard />;
  }

  return (
    <PageWrapper>
      <div className="md:flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">User Data</h1>
          <p className="text-gray-500">Manage your list of users</p>
        </div>
        <AddNewUser />
      </div>
      <div className="flex justify-end items-center md:justify-end gap-2 pb-5 ">
        <Search id="search-users">
          <Filter />
        </Search>
      </div>
      {isPending ? (
        <SkeletonCard />
      ) : (
        <>
          {isError ? (
            <ErrorAlert error={error?.response?.data?.message} />
          ) : (
            <>
              {users?.length > 0 ? (
                <>
                  <Suspense fallback={<SkeletonCard />}>
                    <div className="grid grid-cols-12 gap-4 pt-6">
                      {users.map((item) => (
                        <div
                          key={item._id}
                          className="col-span-12 md:col-span-4 lg:col-span-3"
                        >
                          <UsersCard item={item} />
                        </div>
                      ))}
                    </div>
                  </Suspense>
                  <Paginate
                    totalPages={totalPages}
                    hasMore={hasMore}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                  />
                </>
              ) : (
                <p className="mt-6 font-semibold text-center">No users found</p>
              )}
            </>
          )}
        </>
      )}
    </PageWrapper>
  );
}
