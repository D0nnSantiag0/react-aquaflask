class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    if (!this.queryStr.keyword) {
      return this;
    }

    const keyword = {
      name: {
        $regex: this.queryStr.keyword,
        $options: 'i',
      },
    };

    this.query = this.query.find(keyword);

    return this;
  }

  //UPDATE HERE
  filter() {
    console.log(this.queryStr.color); // add this line
    const queryObj = { ...this.queryStr };
    const excludedFields = ['page', 'sort', 'limit', 'keyword'];
    excludedFields.forEach((el) => delete queryObj[el]);
  
    if (queryObj.color) {
      queryObj.color = queryObj.color.split(',');
    }

    if (queryObj.size) {
      queryObj.size = queryObj.size.split(',');
    }

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    
    // this.query = this.query.find(JSON.parse(queryStr));
     // Check if any query parameter was passed
     if (Object.keys(queryObj).length === 0) {
      // If no query parameter was passed, remove any previous filters
      this.query = this.model.find();
  } else {
      // If query parameters were passed, apply filters
      this.query = this.query.find(JSON.parse(queryStr));
  }
  
    return this;
  }


}

module.exports = APIFeatures;
