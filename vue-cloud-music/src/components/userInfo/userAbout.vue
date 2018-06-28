<template>
  <div class="about-me">
    <div class="info">
      <div class="desc">
        <span class="personal">个人信息</span>
        <table class="about-table">
          <tr>
            <td>等级：</td>
            <td>lv.
              <span class="level">{{aboutInfo.level}}</span>
            </td>
          </tr>
          <tr>
            <td>性别：</td>
            <td>{{aboutInfo.gender}}</td>
          </tr>
          <tr>
            <td>年龄：</td>
            <td>{{aboutInfo.age}}</td>
          </tr>
          <tr>
            <td>地区：</td>
            <td>{{aboutInfo.region}}</td>
          </tr>
        </table>
      </div>
      <div class="desc">
        <span class="personal">个人简介</span>
        <div class="signature">
          <span>{{aboutInfo.signature}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'userAbout',
    props: {
      aboutInfo: {
        type: Object,
        defualt: function () {
          return {}
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/css/fontSize.less';
  @import '../../common/css/color.less';
.about-me {
  position: relative;

  .info {
    padding-top: 20px;

    .desc {
      text-align: left;
      padding-left: 15px;

      .personal {
        position: relative;
        display: block;
        color: @themeBlack;
        height: 1rem;

        &::after {
          position: absolute;
          left: -15px;
          top: 0;
          content: '';
          display: block;
          width: 3px;
          height: 100%;
          background-color: @themeRed;
        }
      }

      .about-table {
        margin: 10px 0 30px;
        border-collapse: collapse;

        & td {
          font-size: .9rem;
          line-height: 2rem;

          .level {
            font-size: .6rem;
          }
        }

        & td:first-child {
          color: @themeGray;
        }

        & td:nth-child(2) {
          color: #6C6D6E;
        }
      }
    }

    .signature {
      padding: 1rem 15px 0 0;
      font-size: .9rem;
      line-height: 1.5rem;
      color: @themeGray;
    }
  }
}
</style>
