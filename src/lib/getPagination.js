export function getPaginationItems(currentPage, lastPage, maxLength) {
  const res = [];

  // handle lastPage less than or equal to maxLength
  for (let i = 1; i <= lastPage; i++) {
    res.push(i);
  }
  if (lastPage <= maxLength) {
    return res;
  }
  res.length = 0;

  // handle ellipsis logics

  const firstPage = 1;
  const confirmedPagesCount = 3;
  const deductedMaxLength = maxLength - confirmedPagesCount;
  const sideLength = deductedMaxLength / 2;

  // handle ellipsis in the middle
  for (let j = 1; j <= sideLength + firstPage; j++) {
    res.push(j);
  }

  res.push(NaN);

  for (let k = lastPage - sideLength; k <= lastPage; k++) {
    res.push(k);
  }
  if (
    currentPage - firstPage < sideLength ||
    lastPage - currentPage < sideLength
  ) {
    return res;
  }
  res.length = 0;

  const deductedSideLength = sideLength - 1;
  res.push(1);
  res.push(NaN);
  for (
    let l = currentPage - deductedSideLength;
    l <= currentPage + deductedSideLength;
    l++
  ) {
    res.push(l);
  }

  res.push(NaN);
  res.push(lastPage);
  if (
    currentPage - firstPage >= deductedMaxLength &&
    lastPage - currentPage >= deductedMaxLength
  ) {
    return res;
  }
  res.length = 0;

  const isNearFirstPage = currentPage - firstPage < lastPage - currentPage;
  let remainingLength = maxLength;

  for (let m = 1; m <= currentPage + 1; m++) {
    res.push(m);
    remainingLength -= 1;
  }

  res.push(NaN);
  remainingLength -= 1;

  for (let n = lastPage - (remainingLength - 1); n <= lastPage; n++) {
    res.push(n);
  }
  if (isNearFirstPage) {
    return res;
  }
  res.length = 0;

  for (let o = lastPage; o >= currentPage - 1; o--) {
    res.unshift(o);
    remainingLength -= 1;
  }

  res.unshift(NaN);
  remainingLength -= 1;

  for (let p = remainingLength; p >= 1; p--) {
    res.unshift(p);
  }

  return res;
}
