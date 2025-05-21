import React, { useState } from 'react';
import {
  Box, Typography, IconButton, Paper, Button, Dialog,
  DialogTitle, DialogContent, DialogActions, Divider, Stack, Skeleton, useMediaQuery
} from '@mui/material';
import { Edit, Cancel, PictureAsPdf, ArrowBack } from '@mui/icons-material';

export default function BookingList({ bookings, onEdit, onCancel, onExport, onBack, isLoading }) {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 6;
  const isMobile = useMediaQuery('(max-width:600px)');

  // Heights calculation
  const headerHeight = 64;
  const paginationHeight = 52;
  const cardHeight = `calc((85vh - ${headerHeight + paginationHeight}px) / ${rowsPerPage})`;

  const handleRowClick = (booking) => {
    if (window.navigator.vibrate) window.navigator.vibrate(10);
    setSelectedBooking(booking);
    setOpenModal(true);
  };

  // Modal actions layout
  const renderModalActions = () => (
    <DialogActions sx={{ p: 0 }}>
      {isMobile ? (
        // Mobile layout (stacked buttons)
        <Stack width="100%">
          <Button
            fullWidth
            size="large"
            startIcon={<Edit sx={{ fontSize: '1.4rem' }} />}
            onClick={() => { onEdit(selectedBooking); setOpenModal(false); }}
            sx={{ 
              py: 2.5,
              justifyContent: 'flex-start',
              pl: 3,
              fontSize: '1.1rem'
            }}
          >
            Edit Booking
          </Button>
          <Divider />
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Button
              fullWidth
              size="large"
              startIcon={<Cancel sx={{ fontSize: '1.4rem' }} />}
              onClick={() => { onCancel(selectedBooking.id); setOpenModal(false); }}
              sx={{ 
                py: 2.5,
                justifyContent: 'flex-start',
                pl: 3,
                color: 'error.main',
                fontSize: '1.1rem',
                flex: 1
              }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              size="large"
              startIcon={<PictureAsPdf sx={{ fontSize: '1.4rem' }} />}
              onClick={() => { onExport(selectedBooking); setOpenModal(false); }}
              sx={{ 
                py: 2.5,
                justifyContent: 'flex-start',
                pl: 3,
                color: 'secondary.main',
                fontSize: '1.1rem',
                flex: 1
              }}
            >
              Voucher
            </Button>
          </Box>
        </Stack>
      ) : (
        // Desktop layout (side by side)
        <Box sx={{ display: 'flex', width: '100%', p: 2 }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Edit />}
            onClick={() => { onEdit(selectedBooking); setOpenModal(false); }}
            sx={{ 
              mr: 2,
              flex: 1,
              py: 1.5,
              fontSize: '1rem'
            }}
          >
            Edit Booking
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Cancel />}
            onClick={() => { onCancel(selectedBooking.id); setOpenModal(false); }}
            sx={{ 
              mr: 2,
              flex: 1,
              py: 1.5,
              color: 'error.main',
              fontSize: '1rem'
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<PictureAsPdf />}
            onClick={() => { onExport(selectedBooking); setOpenModal(false); }}
            sx={{ 
              flex: 1,
              py: 1.5,
              fontSize: '1rem'
            }}
          >
            Voucher
          </Button>
        </Box>
      )}
    </DialogActions>
  );

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header and Pagination (same as before) */}
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        borderBottom: '1px solid #ddd'
      }}>
        <Box sx={{ 
          height: headerHeight,
          display: 'flex', 
          alignItems: 'center', 
          p: 2,
        }}>
          {onBack && <IconButton onClick={onBack}><ArrowBack /></IconButton>}
          <Typography variant="h6" sx={{ flexGrow: 1, fontSize: '1.25rem', ml: 1 }}>
            All Bookings
          </Typography>
        </Box>
        <Box sx={{ 
          height: paginationHeight,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderTop: '1px solid #eee',
          bgcolor: '#f9f9f9'
        }}>
          <Button 
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
            sx={{ fontSize: '1rem', mx: 2 }}
          >
            Previous
          </Button>
          <Typography sx={{ fontSize: '1rem' }}>
            Page {page + 1}
          </Typography>
          <Button
            disabled={(page + 1) * rowsPerPage >= bookings.length}
            onClick={() => setPage(p => p + 1)}
            sx={{ fontSize: '1rem', mx: 2 }}
          >
            Next
          </Button>
        </Box>
      </Box>

      {/* Card List (same as before) */}
      <Box sx={{ 
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {isLoading ? (
          [...Array(rowsPerPage)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={cardHeight} sx={{ mb: 0.5 }} />
          ))
        ) : (
          bookings
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((booking) => (
              <Paper
                key={booking.id}
                onClick={() => handleRowClick(booking)}
                sx={{
                  height: cardHeight,
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  mb: 0.5,
                  cursor: 'pointer',
                  '&:active': { backgroundColor: 'action.selected' }
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontSize: '1.3rem', fontWeight: 500 }}>
                    <strong> REF#</strong>{booking.refNo} <strong> &nbsp;&nbsp;&nbsp;&nbsp;Status: </strong>{booking.status}
                  </Typography>
                  <Typography sx={{ fontSize: '1.3rem' }}>
                   <strong> User: </strong>{booking.hotel}<strong> Customer: </strong>{booking.name}
                  </Typography>
                  <Typography sx={{ fontSize: '1.3rem' }}>
                   <strong> Car: </strong> {booking.carType} <strong> Driver: </strong> {booking.driver} <strong> Payment: </strong> {""+booking.paymentMethod}
                  </Typography>
                  <Typography sx={{ fontSize: '1.3rem' }}>
                   <strong> User Price: </strong>{booking.priceHotel} €<strong> Driver Price: </strong>{booking.priceDriver} €
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '1.3rem', float:'right' }}>
                    <strong> Date: </strong>{new Date(booking.datetime).toLocaleDateString()}
                  </Typography>
                  <br/>
                  <Typography sx={{ fontSize: '1.3rem',float:'right'}}>
                    <strong> Location: </strong>{booking.pickupLocation || booking.route}
                  </Typography>
                </Box>
              </Paper>
            ))
        )}
      </Box>

      {/* Adaptive Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            position: isMobile ? 'absolute' : 'relative',
            bottom: isMobile ? 0 : 'auto',
            m: 0,
            width: isMobile ? '100%' : '60%',
            maxWidth: isMobile ? '100%' : '800px',
            height: isMobile ? '70vh' : 'auto',
            maxHeight: isMobile ? '80vh' : '90vh',
            borderRadius: isMobile ? '16px 16px 0 0' : '8px'
          }
        }}
      >
        <DialogTitle sx={{ py: 2 }}>
          <Typography variant="h6" sx={{ 
            fontSize: isMobile ? '1.3rem' : '1.5rem', 
            textAlign: 'center' 
          }}>
            Booking Actions
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ py: 3 }}>
          {selectedBooking && (
            <Stack spacing={isMobile ? 3 : 4}>
              <Box>
                <Typography sx={{ 
                  fontSize: isMobile ? '1.15rem' : '1.2rem', 
                  color: 'text.secondary' 
                }}>
                  Reference
                </Typography>
                <Typography sx={{ 
                  fontSize: isMobile ? '1.4rem' : '1.6rem', 
                  fontWeight: 500 
                }}>
                  {selectedBooking.refNo}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ 
                  fontSize: isMobile ? '1.15rem' : '1.2rem', 
                  color: 'text.secondary' 
                }}>
                  Customer
                </Typography>
                <Typography sx={{ 
                  fontSize: isMobile ? '1.4rem' : '1.6rem' 
                }}>
                  {selectedBooking.name}
                </Typography>
              </Box>
              <Stack direction="row" spacing={isMobile ? 4 : 6}>
                <Box>
                  <Typography sx={{ 
                    fontSize: isMobile ? '1.15rem' : '1.2rem', 
                    color: 'text.secondary' 
                  }}>
                    Pickup
                  </Typography>
                  <Typography sx={{ 
                    fontSize: isMobile ? '1.4rem' : '1.6rem' 
                  }}>
                    {selectedBooking.pickupLocation || selectedBooking.route}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ 
                    fontSize: isMobile ? '0.95rem' : '1.2rem', 
                    color: 'text.secondary' 
                  }}>
                    Car
                  </Typography>
                  <Typography sx={{ 
                    fontSize: isMobile ? '1.1rem' : '1.6rem' 
                  }}>
                    {selectedBooking.carType}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          )}
        </DialogContent>
        <Divider />
        {renderModalActions()}
      </Dialog>
    </Box>
  );
}