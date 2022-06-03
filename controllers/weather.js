
class WeatherController {
  show(req, res, next) {
    book
      .findOne({ slug: req.params.slug })
      .then((book) => {
        res.render('Books/show', { book: mongooseToObject(book) });
      })
      .catch(next);
  }
  searchByOption(req, res, next) {
    const searchOption = req.body.searchOption;
    const searchValue = req.body.searchTxt;
    // const temp1 = req.body.searchTxt;
    // console.log(temp1);
    // if (searchValue === '') console.log('khong co dau sang oi');

    // console.log(temp);





    const queryValue = { $regex: searchValue, $options: 'i' };
    if (searchValue !== '') {
      if (searchOption === '0') {
        // console.log('0');
        book
          .find({
            $or: [
              { name: queryValue },
              { author: queryValue },
              { category: queryValue },
            ],
          })
        

          .then((book) => {
            res.render('Books/search', {
              book: multipleMongooseToObject(book),
            });
            
          })

          .catch(next);
      }
      if (searchOption === '1') {
        // console.log('name');
        book
          .find({ name: queryValue })
          .then((book) => {
            res.render('Books/search', {
              book: multipleMongooseToObject(book),
            });
            // res.json(book);
          })

          .catch(next);
      }

      if (searchOption === '2') {
        // console.log('Author');
        book
          .find({ author: queryValue })
          .then((book) => {
            res.render('Books/search', {
              book: multipleMongooseToObject(book),
            });
            // res.json(book);
          })

          .catch(next);
      }

      if (searchOption === '3') {
        // console.log('catagory');
        book
          .find({ category: queryValue })
          .then((book) => {
            res.render('Books/search', {
              book: multipleMongooseToObject(book),
            });
            // res.json(book);
          })

          .catch(next);
      }
      
    } else res.render('home');
  }
  getAllBook(req, res, next) {
    book
      .find({})
      .then((book) => {
        res.render('Books/view_book', {
          books: multipleMongooseToObject(book),
        });
      })
      .catch(next);
  }
  form(req, res, next) {
    res.render('Books/addBook')
  }
  addBook(req, res, next) {

    const fromData = req.body;
    console.log(fromData);
    const book_verSave = new book(fromData);
    book_verSave.save();
    res.send("Saved");
  
  }
  
}

const book_ep = new WeatherController();
export { book_ep };
