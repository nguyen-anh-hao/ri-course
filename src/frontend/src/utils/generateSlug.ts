import slugify from 'slugify';

export const generateSlug = (name: string) => {
    slugify.extend({ '+': 'p', '#': 's' });
    return slugify(name, {
        lower: true,
        locale: 'vi',
        remove: /[*+~.()'"!:@]/g,
    });
}

export default generateSlug;