import { Packager } from './packager';

describe('Packager tests', () => {
  const packager: Packager = new Packager();
  it('should get Page Count Even ', function() {
    expect(packager.getPageCount(2, 10)).toBe(5);
    expect(packager.getPageCount(3, 10)).toBe(4);
    expect(packager.getPageCount(3, 2)).toBe(1);
    expect(packager.getPageCount(3, 0)).toBe(0);
  });
});
