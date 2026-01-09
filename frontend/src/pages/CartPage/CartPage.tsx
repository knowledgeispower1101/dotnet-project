import { Container } from '@/components';
import { useParams } from 'react-router-dom';

const CartPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  return (
    <Container>
      <div>Cart Page</div>
    </Container>
  );
};

export default CartPage;
