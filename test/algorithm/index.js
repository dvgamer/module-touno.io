const logger = require('mocha-logger')

describe('Folder -- algorithm', () => {
  it('Functional -- QuickSort', done => {
    const { QuickSort } = require('../../algorithm')
    let sample = [ 1, 2, 4, 7, 9, 1, 5, 8, 9, 0, 6, 7, 4, 6]
    let data = QuickSort(sample)
    logger.log('sample:', sample)
    logger.log('  sort:', data)
    done()
  })
  it('Functional -- RandomString', done => {
    const { RandomString } = require('../../algorithm')
    logger.log(RandomString())
    done()
  })
})