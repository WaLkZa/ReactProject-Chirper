import { formatDistanceToNow } from 'date-fns'

export default (dateIsoFormat) => {
    return formatDistanceToNow(new Date(dateIsoFormat), { addSuffix: true });
}