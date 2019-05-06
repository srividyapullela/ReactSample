import React from 'react'
import Pagination from '../pagination/Pagination'
import PageUtil from './PageUtil'
import Sortutil from './Sortutil'
import CSV from './CSV'
import * as _ from 'lodash';
import PropTypes from 'prop-types';

class GMETable extends React.Component {

    constructor(props){
        super(props)

        let allItems = this.props.allItems
        let pSize = 25
        let start = 1
        let end = 25
        let totalSize = this.props.totalSize
        let totalPages = Math.ceil(totalSize / pSize);
        let sortList = _.cloneDeep(allItems).slice(start-1, end+1)
        let isSorting = false
        let sortDirection = "desc"
        this.state = {
            pSize,
            start,
            end,
            totalPages,
            totalSize,
            allItems,
            sortList,
            isSorting,
            sortDirection
        }

        this.onFirst = this.onFirst.bind(this)
        this.onLast = this.onLast.bind(this)
        this.onPrevious = this.onPrevious.bind(this)
        this.onNext = this.onNext.bind(this)
        this.onSort = this.onSort.bind(this)
        this.onDisplaySizeChange = this.onDisplaySizeChange.bind(this)
    }

    onFirst(){
        let pSize = this.state.pSize
        let totalPages = this.state.totalPages
        let totalSize = this.state.totalSize
        let pageObj = PageUtil.onFirst(pSize,totalPages,totalSize);
        this.setState({isSorting:false,start:pageObj.rangeStart,end:pageObj.rangeEnd,totalPages:pageObj.totalPages})
    }

    onLast(){
        let pSize = this.state.pSize
        let totalPages = this.state.totalPages
        let totalSize = this.state.totalSize
        let pageObj = PageUtil.onLast(totalSize,totalPages,pSize);
        this.setState({isSorting:false,start:pageObj.rangeStart,end:pageObj.rangeEnd,totalPages:pageObj.totalPages})
    }

    onPrevious(){
        let pSize = this.state.pSize
        let totalPages = this.state.totalPages
        let totalSize = this.state.totalSize
        let rangeStart = this.state.start
        let rangeEnd = this.state.end
        let pageObj = PageUtil.onPrevious(pSize,rangeStart,rangeEnd,totalSize,totalPages);
        this.setState({isSorting:false,start:pageObj.rangeStart,end:pageObj.rangeEnd,totalPages:pageObj.totalPages})
    }

    onNext(){
        let pSize = this.state.pSize
        let totalPages = this.state.totalPages
        let totalSize = this.state.totalSize
        let rangeStart = this.state.start
        let rangeEnd = this.state.end
        let pageObj = PageUtil.onNext(pSize,rangeStart,rangeEnd,totalSize,totalPages);
        this.setState({isSorting:false,start:pageObj.rangeStart,end:pageObj.rangeEnd,totalPages:pageObj.totalPages})
    }

    onDisplaySizeChange(e){
        let pageObj = PageUtil.onPageSizeDisplay(this.state.totalSize,e.target.value);
        this.setState({isSorting:false,pSize:e.target.value,start:pageObj.rangeStart,end:pageObj.rangeEnd,totalPages:pageObj.totalPages})
    }

    onSort(fieldName){
        let sortDirection = this.state.sortDirection == 'desc'?'asc':'desc';
        let sortList = _.cloneDeep(this.state.allItems).slice(this.state.start,this.state.end+1);
        this.setState({isSorting:true,sortList:Sortutil.sort(sortList,fieldName,sortDirection),sortDirection})
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.totalSize != nextProps.totalSize && this.props.allItems != nextProps.allItems){
          let pSize = 25
          let totalPages = Math.ceil(nextProps.totalSize / pSize);
          let pageObj = PageUtil.onPageSizeDisplay(nextProps.totalSize,pSize);
          this.setState({totalSize:nextProps.totalSize,allItems:nextProps.allItems,start:pageObj.rangeStart,end:pageObj.rangeEnd,
            totalPages, sortList:_.cloneDeep(nextProps.allItems).slice(pageObj.rangeStart-1, pageObj.rangeEnd+1),pSize})
        }
    }

    render(){
        let dataList;
        if(this.state.isSorting){
            dataList = this.state.sortList
        }else{
            dataList = _.cloneDeep(this.props.tableBody).slice(this.state.start-1,this.state.end+1)
        }

        const rangeOptns = {onFirst:this.onFirst,onLast:this.onLast,onPrevious:this.onPrevious,onNext:this.onNext,itemsSize:this.state.totalSize,
                            start:this.state.start, end:this.state.end}
        const sizeOptns = {onDisplaySizeChange:this.onDisplaySizeChange,itemsSize:this.state.totalSize, pSize:this.state.pSize}

        const tableHeader = (propHeaders) => {

            return (
              <thead>
                <tr>
                    {propHeaders.map(header => ("" != header)?<th onClick={() => this.onSort(header.sortTitle)}>{header.title}</th>:null)}
                </tr>
              </thead>
            )
        }

        return(
            <div>
                <div className="contenttitleseperator left fullwidth">
                    <div className="contenSeperatorLine  left fullwidth nomargin">&nbsp;</div>
                </div>
                <Pagination sizeOptns={sizeOptns} position="top" rangeOptns={rangeOptns}/>
                <div className="left fullwidth">
                    <table id="esitable" className="tdsn dottedtdsn tablepagination">
                        {tableHeader(this.props.tableHeaders)}
                        <tbody id="transTbody">
                            {dataList}
                        </tbody>
                    </table>
                </div>
                <Pagination sizeOptns={sizeOptns} rangeOptns={rangeOptns}/>
                {this.props.csvData?<CSV csvData={this.props.csvData} csvFileName={this.props.csvFileName} />:""}
            </div>
        )
   }
}

GMETable.propTypes = {
    allItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalSize: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    tableBody: PropTypes.element.isRequired,
    tableHeaders: PropTypes.element.isRequired,
    csvData: PropTypes.arrayOf(PropTypes.object),
    csvFileName: PropTypes.string
}

export default GMETable
