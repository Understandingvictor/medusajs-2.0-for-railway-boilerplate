import StoreTemplate from "@modules/store/templates"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

export default async function StorePage(props: {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ sortBy?: SortOptions; page?: string }>
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { sortBy, page } = searchParams

  return (
    <StoreTemplate sortBy={sortBy}>
      {/* By putting PaginatedProducts INSIDE StoreTemplate here, 
        Next.js allows PaginatedProducts to stay a Server Component 
        while StoreTemplate stays a Client Component.
      */}
      <PaginatedProducts
        sortBy={sortBy || "created_at"}
        page={page ? parseInt(page) : 1}
        countryCode={params.countryCode}
      />
    </StoreTemplate>
  )
}
