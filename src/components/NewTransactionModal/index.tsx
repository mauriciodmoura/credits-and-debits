import Modal from 'react-modal';
import incomeImg from '../../assets/income.png'
import outcomeImg from '../../assets/outcome.png'
import closeImg from '../../assets/close.png'
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export const NewTransactionModal = ({
    isOpen,
    onRequestClose
  }: NewTransactionModalProps) => {
    const { createTransaction } = useTransactions();
  
    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState('');
    const [amount, setAmout] = useState(0);
    const [category, setCategory] = useState('');
  
    async function handleCreateNewTransaction(event: FormEvent) {
      event.preventDefault();
  
      await createTransaction({ type, title, amount, category });
  
      setType('deposit');
      setTitle('');
      setAmout(0);
      setCategory('');
      onRequestClose();
    }

    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          overlayClassName="react-modal-overlay"
          className="react-modal-content"
        >
            <button
                className="react-modal-close"
                type="button"
                onClick={onRequestClose}
            >
                <img src={closeImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input placeholder="Título"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                />

                <input type="number" placeholder="Valor"
                value={amount}
                onChange={({ target }) => setAmout(Number(target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => setType('deposit')}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => setType('withdraw')}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input placeholder="Categoria" 
                value={category}
                onChange={({ target }) => setCategory(target.value)}
                />

                <button type="submit">
                Cadastrar
                </button>
            </Container>
        </Modal>
    );
}