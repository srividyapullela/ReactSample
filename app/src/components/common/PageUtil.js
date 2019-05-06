
class PageUtil {

  static onFirst(pageSize,totalPages,totalSize){
      let pSize =parseInt(pageSize);
      let rangeEnd = pSize>totalSize?totalSize:pSize;
      return {rangeStart:1,rangeEnd,totalPages,pSize};
  }

  static onNext(pageSize, rangeStart, rangeEnd, totalSize, totalPages){
     let pSize =parseInt(pageSize);
     if(rangeEnd+pSize > totalSize || rangeStart+pSize > totalSize){
         rangeStart = (rangeStart+pSize > totalSize)?rangeStart:rangeStart+pSize;
         rangeEnd = totalSize;
     }else{
         rangeStart = rangeStart+pSize;
         rangeEnd = rangeEnd+pSize;
     }
     return {rangeStart,rangeEnd,totalPages,pSize};
  }

  static onPrevious(pageSize, rangeStart, rangeEnd, totalSize,totalPages){
      let pSize = parseInt(pageSize);
      if(rangeStart-pSize < 0 || rangeEnd-pSize < pSize){
          rangeStart = 1;
          rangeEnd = (rangeEnd-pSize < pSize)?(pSize>totalSize?totalSize:pSize):rangeEnd-pSize;
      }else{
          rangeStart = rangeStart-pSize;
          rangeEnd = (rangeEnd == totalSize)?(rangeStart+pSize)-1:(rangeEnd-pSize);
      }
      return {rangeStart,rangeEnd,totalPages,pSize};
  }

  static onLast(totalSize, totalPages, pageSize){
    let rangeStart = ((totalPages-1) * parseInt(pageSize))+1;
    return {rangeStart,rangeEnd:totalSize,totalPages,pSize:parseInt(pageSize)};
  }

  static onPageSizeDisplay(totalSize,pageSize){
      let pSize = parseInt(pageSize);
      let rangeEnd = (pSize == 0 || pSize>totalSize)?totalSize:pSize;
      let totalPages = Math.ceil(totalSize / pSize);
      return {rangeStart:1,rangeEnd,totalPages,pSize};
  }

}

export default PageUtil;
