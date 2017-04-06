<template lang="html">
  <div class="container-fluid">
    <h1 class="dashboard_title">Transactions</h1>
    <div class="row">
      <div class="col-sm-12">
        <form class="form-horizontal">
          <fieldset>
            <legend>Add new transaction</legend>
            <div class="form-group">
              <label for="amount" class="col-lg-2 control-label">Amount</label>
              <div class="col-lg-10">
                <input type="text" class="form-control" id="amount" placeholder="Amount">
              </div>
            </div>
            <div class="form-group">
              <div class="col-lg-10 col-lg-offset-2">
                <button type="reset" class="btn btn-default">Reset</button>
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
    <div class="row"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>
