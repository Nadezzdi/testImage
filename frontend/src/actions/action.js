export const SELECT_PAGE = 'SELECT_PAGE';
export function selectPage(page) {
  if ((page >0) && (page <= 3)) {
    return {
      type: SELECT_PAGE,
      page: page
    }
  } else
    return {type: "NOTHING_TO_DO"}
}
