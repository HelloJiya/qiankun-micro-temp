<template>
  <edit-page padding="20px" class="plan-date">
    <common-search
      :search-list="searchList"
      :search-form="searchForm"
      @get-data="getData"
      @reset-data="$_clearSearch(searchForm,false,getData)"
    />
    <div class="plan-date-content">
      <a-calendar v-model="curDate" class="plan-date-content-calendar" fullscreen @panelChange="panelChange">
        <!-- title -->
        <div slot="headerRender" slot-scope="{value}">
          <div class="calender-header">
            <div>
              <el-radio-group v-model="model">
                <el-radio label="executorUserName">人员</el-radio>
                <el-radio label="planName">计划</el-radio>
              </el-radio-group>
            </div>
            <div>
              <i class="el-icon-arrow-left" @click="beforeTime" />
              <span class="click" @click="dateClick">{{ value.format('YYYY年M月') }}</span>
              <i class="el-icon-arrow-right" @click="afterTime" />
            </div>
            <div>
              <i class="el-icon-search icon" size="mini" @click="dialogVisible = true" />
              <i class="el-icon-s-unfold icon" @click="toggleExpend" />
            </div>
            <el-date-picker ref="datePick" v-model="datePickValue" value-format="yyyy-MM" type="month" class="datePick" />
          </div>
        </div>
        <!-- content -->
        <div slot="dateFullCellRender" slot-scope="value" class="ant-fullcalendar-date calender-content">
          <div class="calender-content-header">
            <span>{{ value.date() }}</span>
            <el-popover
              :visible-arrow="false"
              placement="left-start"
              width="200"
              z-index="99"
              trigger="click"
            >
              <DateTagList
                :data="getTag(value,uniqKey)"
                :props="{label:model,key:'id'}"
                @click="tagClick"
              />
              <span v-show="getTag(value,uniqKey).length>2" slot="reference" class="click" @click.stop>展开</span>
            </el-popover>
          </div>
          <DateTagList
            :data="getTag(value,uniqKey)"
            :limit="2"
            :props="{label:model,key:'id'}"
            @click.prevent.native="tagClick"
          />
        </div>
      </a-calendar>

      <!-- 表格 -->
      <DatePlanTable
        class="plan-date-content-table"
        :visible="visible"
        :data="getTag(curDate)"
        :date="curDate"
      />
    </div>
    <!-- 弹窗 -->
    <DatePlanListDialog v-if="dialogVisible" :visible.sync="dialogVisible" :date="curDate" />
  </edit-page>
</template>

<script>
import moment from 'moment'
import { Calendar } from 'ant-design-vue'
import 'ant-design-vue/lib/calendar/style/css'
import uniqBy from 'lodash/uniqBy'

import { date as dateApi } from '@/api/plan'

import { dateProp } from './prop'

import DateTagList from './components/DateTagList'
import DatePlanListDialog from './components/DatePlanListDialog'
import DatePlanTable from './components/DatePlanTable'
export default {
  name: 'PlanDate',
  components: {
    [Calendar.name]: Calendar,
    DatePlanListDialog,
    DateTagList,
    DatePlanTable
  },

  data() {
    return {
      ...dateProp(this),
      searchForm: {},
      curDate: moment(new Date()),
      list: [],
      visible: true,
      dialogVisible: false,
      model: 'planName',
      tableData: []
    }
  },
  computed: {
    datePickValue: {
      get() {
        return this.curDate.format('yyyy-MM-DD')
      },
      set(value) {
        this.curDate = moment(`${value}-${this.curDate.date()}`)
      }
    },
    // 去重判断字段
    uniqKey() {
      return this.model === 'planName' ? 'planId' : 'userId'
    }
  },
  mounted() { this.getData() },
  methods: {
    // 获取当月数据
    getData() {
      dateApi.getList(this.$_formatApi({ planDate: this.datePickValue, ...this.searchForm })).then(res => {
        console.log(res)
        const data = this.$deepClone(res.data)
        this.list = data
      })
    },
    /**
     * 获取当日的计划列表（包含去重）
     * value 当前日期
     * key 去重字段
     */
    getTag(value, key) {
      if (!value.isSame(this.datePickValue, 'month')) {
        return []
      }
      const date = value.date()
      const retObj = this.list.find(item => {
        return parseInt(item?.planDate?.split('-')[2]) === date
      })
      let ret = (retObj && retObj.planTaskDateList) || []
      if (key) {
        ret = uniqBy(ret, key)
      }
      return ret
    },
    // 日历切花
    panelChange(date, mode) {
      this.getData()
    },
    // 上一个月
    beforeTime() {
      this.curDate = moment(this.curDate.add(-1, 'month'))
      this.panelChange()
    },
    // 下一个月
    afterTime() {
      this.curDate = moment(this.curDate.add(1, 'month'))
      this.panelChange()
    },
    // 日期选择
    dateClick() {
      this.$refs.datePick.focus()
    },
    // 表格展示
    toggleExpend() {
      this.visible = !this.visible
    },
    tagClick(item, index) {
      console.log('tagClick')
    }
  }
}
</script>

<style lang='scss' scoped>
$namespace:'.plan-date';
.click{
  display: inline-block;
  cursor: pointer;
  outline: none;
  user-select: none;
}
.icon{
  font-size: 18px;
  color: #838A9D;
  & + &{
    margin-left: 10px;
  }
}
#{$namespace}{
  &-content{
    position: relative;
    display: flex;
    overflow: hidden;

    border: 1px solid #eee;
    box-shadow: 0 0 4px #eee;

    &-calendar{
      // box-sizing: border-box;
    }

    &-table{
      flex-shrink: 0;
      border-left: 1px solid #eee;
    }
  }

  /deep/.ant-fullcalendar-next-month-btn-day, .ant-fullcalendar-last-month-cell{
    .calender-content{
      background: #efefef;
    }
    .calender-content-header{
      color: rgb(170, 159, 159);
    }
  }
  /deep/.ant-fullcalendar-today{
    // border-top: 1px solid red;
  }
  /deep/.ant-fullcalendar-selected-day{
    // background: rgba(red,.6);
  }
  /deep/.ant-fullcalendar-fullscreen .ant-fullcalendar-date{
    margin: 0;
  }
  /deep/.ant-fullcalendar-cell+.ant-fullcalendar-cell{
    border-left: 1px solid #eee;
  }
}
// 日历头部
.calender-header{
  position: relative;
  display: flex;
  align-content: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 15px 0 ;
  margin: 0 20px 10px ;

  cursor: pointer;
  border-bottom: 1px solid #eee;
  .datePick{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    z-index: -99;
  }
}
// 日历内容
.calender-content{
  height: 120px;
  overflow: hidden;
  padding: 10px;
  border-top: 1px solid #eee;
  &-header{
    display: flex;
    min-width: 0;
    justify-content: space-between;
    padding-bottom: 10px;
  }
}
</style>
